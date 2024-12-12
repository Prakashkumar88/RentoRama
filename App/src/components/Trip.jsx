import location from "../assets/traveler.png";
import calendar from "../assets/calendar.png";
import verified from "../assets/verified.png";

function Trip() {
  return (
    <>
      <section className="py-32 px-0">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="text-center text-black">
              <h3 className="h2 font-medium">
                Plan your trip now
              </h3>
              <h1 className="h1 my-5">
                Quick <span className="text-orange-600">&</span> easy car rental
              </h1>
            </div>

            <div className="flex justify-center mt-10">
              <div className="text-center px-1 py-6 mx-4 lg:flex-wrap">
                <img src={location} alt="icon_img" className="w-20 h-25 mx-auto mb-3 " />
                <h3 className="font-bold ">Select Your Location</h3>
                <p className="mb-1 text-gray-400">
                    Choose from our wide range of locations and find the 
                    perfect starting point for your adventure.
                </p>
              </div>

              <div className="text-center px-1 py-6 mx-4">
                <img src={calendar} alt="icon_img" className="w-25 h-25 mx-auto mb-3" />
                <h3 className="font-bold">Select Date</h3>
                <p className="mb-1 text-gray-400">
                    Book your rental for the dates that suit you best.
                    Our friendly team is here to assist you every step of the way.
                </p>
              </div>

              <div className="text-center px-1 py-6 mx-4">
                <img src={verified} alt="icon_img" className="w-20 h-25 mx-auto mb-3" />
                <h3 className="font-bold">Let's Drive</h3>
                <p className="mb-1 text-gray-400">
                  Whether you're hitting the open road, we've got you covered
                  with our wide range of cars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Trip;
