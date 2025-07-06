import { IFileDocument, FileModel } from "../files";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class FileQueries {
  private fileModel: Model<IFileDocument>;

  constructor() {
    this.fileModel = FileModel;
  }

  createFile = async (data: any): Promise<any> => {
    return await this.fileModel.create(data);
  };

  deleteFile = async (data: any): Promise<any> => {
    return await this.fileModel.deleteOne({ _id: new ObjectId(data.file_id) });
  };

  updateViewCount = async (data: any): Promise<any> => {
    return await this.fileModel.updateOne(
      { _id: new ObjectId(data.file_id) },
      { $inc: { viewCount: 1 } }
    );
  };

  getAllFiles = async (data: any): Promise<any> => {
    let aggregateQuery: any[] = [];

    if (data.user_id) {
      aggregateQuery.push({
        $match: {
          user_id: new ObjectId(data.user_id),
        },
      });
    }

    if (data.search) {
      const escapedSearch = data.search.replace(/[()]/g, "\\$&");
      const regex = new RegExp(escapedSearch, "i");

      aggregateQuery.push({
        $match: {
          $or: [
            { name: { $regex: regex } },
            // { url: { $regex: regex } },
            { tags: { $regex: regex } },
          ],
        },
      });
    }

    if (data.sort && data.sort === "size") {
      aggregateQuery.push({
        $sort: {
          size: -1,
        },
      });
    } else if (data.sort && data.sort === "viewCount") {
      aggregateQuery.push({
        $sort: {
          viewCount: -1,
        },
      });
    } else {
      aggregateQuery.push({
        $sort: {
          created_at: -1,
        },
      });
    }

    if (data.filter && data.filter !== "all") {
      let regex;

      if (data.filter === "pdf") {
        regex = "^application/pdf$";
      } else {
        regex = `^${data.filter}/`;
      }

      aggregateQuery.push({
        $match: {
          type: { $regex: regex, $options: "i" },
        },
      });
    }

    aggregateQuery.push({
      $project: {
        _id: 0,
        file_id: "$_id",
        user_id: 1,
        name: 1,
        url: 1,
        size: 1,
        type: 1,
        tags: 1,
        viewCount: 1,
        updated_at: 1,
        created_at: 1,
      },
    });

    const $facet: any = {
      paginatedResults: [],
      totalCount: [{ $count: "count" }],
    };
    if (data.skip != undefined) {
      $facet.paginatedResults.push({ $skip: data.skip });
    }
    if (data.limit != undefined) {
      $facet.paginatedResults.push({ $limit: data.limit });
    }
    aggregateQuery.push({ $facet });

    return await this.fileModel.aggregate(aggregateQuery);
  };
}
