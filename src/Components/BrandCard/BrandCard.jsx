/* eslint-disable react/prop-types */
export default function BrandCard({brandInfo}) {
  return (
    <div className="col-span-2 shadow-lg rounded overflow-hidden bg-white">
      <div className=" overflow-hidden">
      <img src={brandInfo.image} className="w-full  hover:scale-110 hover:rotate-6 transition-all duration-300" />
      </div>
      <div>
        <h2 className=" font-semibold py-4 text-center  uppercase">{brandInfo.name}</h2>
      </div>
    </div>
  )
}