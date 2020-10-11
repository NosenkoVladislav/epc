export default class ApiService {
  _apiUrl = "http://localhost:3000/users/";

  async getAllUsers() {
    try {
      const res = await fetch(this._apiUrl);
      if (!res.ok) {
        throw new Error(
          `Could not get ${this._apiUrl}, received ${res.status}`
        );
      }
      const body = await res.json();
      return body;
    } catch (e) {
      console.log("Cannot get users");
    }
  }

  async editUser(data, uuid) {
    try {
      await fetch(this._apiUrl + uuid, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log("Cannot edit user data");
    }
  }

  async deleteUser(uuid) {
    try {
      await fetch(this._apiUrl + uuid, {
        method: "DELETE",
      });
    } catch (e) {
      console.log("Cannot delete user");
    }
  }
}
