const NgoDashboard = () => {
    const ngo = JSON.parse(localStorage.getItem("ngo"));
  
    if (!ngo) return <p>Unauthorized</p>;
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {ngo.name}
        </h1>
  
        <p className="text-gray-600">
          NGO ID: {ngo.id}
        </p>
  
        <p className="mt-4 text-green-700 font-semibold">
          Status: Verified ✅
        </p>
      </div>
    );
  };
  
  export default NgoDashboard;
  