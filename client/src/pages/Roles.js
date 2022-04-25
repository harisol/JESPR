import { useEffect } from 'react';
import AlertBox from '../components/AlertBox';
import { useFetchGet } from '../utils/fetch-hook';
import { formatDate } from '../utils/helpers';

const Role = () => {
  const { data, isLoading, error, startFetch } = useFetchGet('/role');

  useEffect(() => {
    startFetch();
  }, []);

  return (
    <>
      {error && <AlertBox type="danger" msg={error} withClass="col-md-6 m-auto" />}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">List Role</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {!data?.roles?.length ? (
              <tr>
                <td colSpan="3" className="text-center">
                  {isLoading ? 'Loading data..' : 'No data'}
                </td>
              </tr>
            ) : (
              data.roles.map((row, i) => (
                <tr key={`list-role-${i}`}>
                  <td>{i + 1}</td>
                  <td>{row.rolename}</td>
                  <td>{formatDate(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Role;
