import cakes from "../assets/img/cakes.svg";

const Index = () => {
  return (
    <div className="h-screen mt-28 md:mt-0 md:flex items-center justify-between">
      <div className="md:w-1/2">
        <h1 className="text-6xl">
          Welcome to Most Delicious Cakes in the Country
        </h1>
        <p className="text-left my-3 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          quam blanditiis saepe perferendis, ipsa cum? Fugit tempora aspernatur
          perferendis soluta quibusdam et labore velit aperiam, dolorum ducimus
          est quidem laborum.
        </p>
        <button className="bg-blue-500 font-bold text-white py-2 px-3 rounded">
          Learn More
        </button>
      </div>
      <div>
        <img src={cakes} alt="gravitas" />
      </div>
    </div>
  );
};

export default Index;
