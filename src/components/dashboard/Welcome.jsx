import NavBar from "../ui/NavBar";
export default function Welcome() {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <>
      <div className="pt-10">
        <h2>welcome</h2>
        <h2>welcome {userEmail}</h2>
      </div>
    </>
  );
}
