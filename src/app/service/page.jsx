export default function Service() {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 p-0 lg:p-4 gap-4 lg:gap-0">
        <h1 className="text-[50px] lg:text-[75px] font-semibold uppercase">
          our <span className="text-[#EF1E24]">services</span>
        </h1>
        <div className="flex flex-col gap-2 w-auto lg:max-w-[600px] ">
          <p className="text-[20px] lg:text-[24px] font-semibold uppercase">
            Logistics and Transport Solutions Tailored to Your Needs
          </p>
          <p className="text-[18px] lg:text-[20px]">
            At Arabian Sky Transport, we offer a wide range of services designed
            to meet the diverse logistics needs of businesses across the UAE and
            GCC. Whether you're managing a heavy cargo shipment, looking for
            reliable equipment rentals, or need comprehensive fleet support, our
            team is ready to deliver solutions that keep your operations running
            smoothly.
          </p>
          <div className="flex gap-2 items-center justify-center bg-[#01016F] text-white p-2 max-w-[135px] rounded-[30px]">
            <p className="text-[14px]">get in touch</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
            >
              <rect width="28" height="27" rx="13.5" fill="white" />
              <path
                d="M10.1824 18.7166C10.0165 18.5664 9.91708 18.3565 9.90595 18.133C9.89483 17.9095 9.97294 17.6907 10.1231 17.5248L16.7569 10.1959L11.8224 10.7171C11.6006 10.7393 11.379 10.6728 11.2061 10.5321C11.0331 10.3914 10.9229 10.188 10.8994 9.96634C10.876 9.74465 10.9412 9.52268 11.0809 9.34893C11.2206 9.17519 11.4233 9.06377 11.6449 9.03903L18.7757 8.2858C18.8939 8.27318 19.0134 8.28567 19.1264 8.32245C19.2394 8.35923 19.3434 8.41947 19.4315 8.49923C19.5196 8.57899 19.5899 8.67646 19.6377 8.78527C19.6855 8.89407 19.7098 9.01175 19.709 9.1306L19.6677 16.301C19.6677 16.4122 19.6457 16.5223 19.603 16.625C19.5603 16.7277 19.4977 16.8209 19.4188 16.8993C19.3399 16.9777 19.2463 17.0397 19.1434 17.0818C19.0405 17.1239 18.9302 17.1453 18.819 17.1446C18.7078 17.144 18.5978 17.1213 18.4954 17.078C18.3929 17.0347 18.3001 16.9716 18.2221 16.8922C18.1442 16.8129 18.0827 16.7189 18.0412 16.6158C17.9997 16.5126 17.979 16.4022 17.9803 16.291L18.008 11.3283L11.3742 18.6573C11.224 18.8232 11.0141 18.9226 10.7906 18.9338C10.5671 18.9449 10.3483 18.8668 10.1824 18.7166Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#BEBDBD] h-[465px] w-auto rounded-[16px]"></div>

      <div>
        <h1 className="text-[30px] lg:text-[50px] text-[#01016F] text-center uppercase font-semibold mt-[40px] lg:mt-[115px]">
          our key services
        </h1>
        <div>
          <div className="p-[81px]">
            <p>
              01.
              <span className="uppercase text-center">
                Heavy Haulage & Project Cargo
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
