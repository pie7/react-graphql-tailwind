import { useQuery, gql, useMutation } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users(limit: 20, order_by: { timestamp: desc }) {
      id
      name
      rocket
      twitter
      timestamp
    }
  }
`;

const DEL_USER = gql`
  mutation deleteUser($id: uuid!) {
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;

const CrewTable = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [delUser] = useMutation(DEL_USER,{
    refetchQueries: [GET_USERS]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error}`}</p>;

  return (
    <table className="table-auto">
      <thead className="text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-2 py-1">#</th>
          <th className="px-2 py-1">Name</th>
          <th className="px-2 py-1">Rocket</th>
          <th className="px-2 py-1">Date</th>
          <th className="px-2 py-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.users?.map((user, index) => (
          <tr key={`${index}`} className="hover:bg-gray-100">
            <td className="px-2 py-1">{index + 1}</td>
            <td className="px-2 py-1">{user.name}</td>
            <td className="px-2 py-1">
              {user.rocket}
            </td>
            <td className="px-2 py-1">{user.timestamp.slice(0, 10)}</td>
            <td className="px-2 py-1 text-center">
              <button
                className="cursor-pointer uppercase border px-2 py-1"
                onClick={() => delUser({ variables: { id: user.id } })}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CrewTable;
