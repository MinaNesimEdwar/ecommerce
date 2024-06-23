export default function CategoryCard({categInfo}) {
  return (
    <div className="col-span-2 shadow-lg rounded overflow-hidden bg-white  ">
      <div className=" overflow-hidden">
      <img src={categInfo.image} className="w-full h-[350px] object-cover hover:scale-110 hover:rotate-6 transition-all duration-300" />
      </div>
      <div>
        <h2 className=" font-bold py-4 text-center text-xl text-main uppercase">{categInfo.name}</h2>
      </div>
    </div>
  )
}
