import { Counter } from '../components/Counter';
import Layout1 from '../components/Layouts/Layout1';
import Pokemon from '../components/Pokemon';
const SampleRedux = () => {

  return (
    <Layout1>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Simple Sample of Redux</h1>
      </div>
      <h4 className="my-5 text-decoration-underline">Basic Sample</h4>
      <Counter />
      <h4 className="my-5 text-decoration-underline">Redux Toolkit Query</h4>
      <Pokemon />
    </Layout1>
  );
};

export default SampleRedux;
