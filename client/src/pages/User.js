import { useEffect } from "react";
import AlertBox from "../components/AlertBox";
import Layout1 from "../components/Layouts/Layout1";
import { useFetchGet } from "../utils/custom-hooks/fetch.hook";
import { formatDate } from "../utils/helpers";

const User = () => {
  const { data, isLoading, error, startFetch } = useFetchGet('/user');

  useEffect(() => {
    startFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Layout1>
      {/* show error fetch API */}
      {error && <AlertBox type="danger" msg={error} withClass="col-md-6 m-auto" />}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">List User</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {!data?.users?.length ? (
              <tr>
                <td colSpan="4" className="text-center">
                  {isLoading ? 'Loading data..' : 'No data'}
                </td>
              </tr>
            ) : (
              data.users.map((row, i) => (
                <tr key={`list-user-${i}`}>
                  <td>{i + 1}</td>
                  <td>{row.username}</td>
                  <td>{row.Role.rolename}</td>
                  <td>{formatDate(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout1>
  );
};

export default User;
