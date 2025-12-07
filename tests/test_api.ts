import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const API_URL = "http://localhost:8080/api";

// Test Configuration
const TEST_USER = {
  email: "testuser_" + Date.now() + "@example.com",
  password: "password123",
  name: "Test User",
};

const SHARED_USER = {
  email: "friend_" + Date.now() + "@example.com",
  password: "password123",
  name: "Friend User",
};

const DUMMY_FILE_PATH = path.join(__dirname, "dummy.txt");

async function runTests() {
  console.log("🚀 Starting API Tests...");

  // Create Dummy File
  fs.writeFileSync(DUMMY_FILE_PATH, "Hello World from File Sharing System!");

  try {
    // 1. Register & Login Owner
    console.log("\n1. Authentication (Owner)...");
    await axios.post(`${API_URL}/auth/register`, TEST_USER).catch(() => {}); // Ignore if exists
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    const token = loginRes.data.token;
    console.log("✅ Logged in as Owner. Token acquired.");

    // 2. Register Shared User (for later)
    console.log("\n2. Authentication (Shared User)...");
    await axios.post(`${API_URL}/auth/register`, SHARED_USER).catch(() => {});
    const friendLoginRes = await axios.post(`${API_URL}/auth/login`, {
      email: SHARED_USER.email,
      password: SHARED_USER.password,
    });
    const friendToken = friendLoginRes.data.token;
    console.log("✅ Customer User Registered.");

    // 3. Bulk Upload
    console.log("\n3. Testing Bulk Upload...");
    const formData = new FormData();
    formData.append("documents", fs.createReadStream(DUMMY_FILE_PATH));
    formData.append("tags", JSON.stringify(["test", "api"]));

    const uploadRes = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });
    const uploadedFiles = uploadRes.data;
    console.log(`✅ Uploaded ${uploadedFiles.length} file(s).`);
    const fileId = uploadedFiles[0].file_id || uploadedFiles[0]._id; // Handle varying response structure
    console.log(`   File ID: ${fileId}`);

    // 4. Get All Files
    console.log("\n4. Testing Get All Files...");
    const listRes = await axios.get(`${API_URL}/files`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Controller returns { result: [...], metadata: {...} }
    const files = listRes.data.result;
    console.log(`✅ Retrieved ${files.length} files.`);

    // 5. Share File
    console.log("\n5. Testing Share File...");
    const shareRes = await axios.post(
      `${API_URL}/files/${fileId}/share`,
      { email: SHARED_USER.email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`✅ Share Response: ${shareRes.data.message}`);

    // 6. Generate Link
    console.log("\n6. Testing Generate Link...");
    const linkRes = await axios.post(
      `${API_URL}/files/${fileId}/link`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const linkUrl = linkRes.data.url;
    console.log(`✅ Generated Link: ${linkUrl}`);
    const tokenUuid = linkUrl.split("/").pop();

    // 7. Access Shared Link (as Friend)
    console.log("\n7. Testing Access Shared Link (as Friend)...");
    const accessRes = await axios.get(`${API_URL}/shared/${tokenUuid}`, {
      headers: { Authorization: `Bearer ${friendToken}` },
    });
    console.log(`✅ Accessed Shared File: ${accessRes.data.name}`);

    // 8. Update View Count (as Friend)
    console.log("\n8. Testing Update View Count...");
    const viewRes = await axios.patch(
      `${API_URL}/files/update_view_count?file_id=${fileId}`,
      {},
      { headers: { Authorization: `Bearer ${friendToken}` } }
    );
    console.log(`✅ View Count Updated: ${viewRes.data.message}`);

    // 9. Delete File
    console.log("\n9. Testing Delete File...");
    const deleteRes = await axios.delete(`${API_URL}/files/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { file_id: fileId },
    });
    console.log(`✅ Delete Response: ${deleteRes.data.message}`);

    console.log("\n🎉 ALL TESTS PASSED!");
  } catch (error: any) {
    console.error("\n❌ TEST FAILED");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else {
      console.error(error.message);
    }
  } finally {
    if (fs.existsSync(DUMMY_FILE_PATH)) fs.unlinkSync(DUMMY_FILE_PATH);
  }
}

runTests();
