import Image from "next/image";
import dheni from "./assets/dheni.jpg";

const HouseCard = () => {
  return (
    <div className=" card rounded-none w-[100%] mb-4">
      <figure className=" shadow-md bg-bse-200  max-h-[450px] h-auto">
        <Image
          src={dheni}
          alt="thumbnail"
          objectPosition="center"
          layout="fit" // Use layout="fill" for responsive sizing
          objectFit="cover" // Use objectFit="cover" to crop if needed
          className="object-cover w-[50%] object-center" // Add Tailwind class for object-fit
          priority // Prioritize loading this image for a better experience
          
        />
        <div className="card-body ">
        <h2 className="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div>
      </figure>
      
    </div>
  );
};

export default HouseCard;
