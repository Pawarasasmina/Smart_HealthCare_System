import { Link } from "react-router-dom";

//images
import heroImage from '../assets/heroImage.png';
import heroBackground from '../assets/heroBackground.png';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary py-12 lgs:mt-12">
        <div className="container mx-auto overflow-hidden flex flex-col bg-transparent lgs:h-[80vh] lgs:rounded-3xl lgs:w-[100vw] lgs:flex-row items-center justify-center">
        
           {/* Main 01 section */}
            <div className= 'flex flex-col h-auto lgs:w-[50vw] overflow-hidden items-center justify-center bg-baseprimary lgs:h-[80vh]' style={{
                    boxShadow:'inset 0 5px 10px rgba(255,255,255,1), 0px 5px 10px rgba(0,0,0,0.4)',

            }}>
                    {/* Background Section */}
                <div className= 'flex flex-col h-auto lgs:w-[50vw] items-center justify-center bg-transparent lgs:h-[80vh]' style={{
                                        backgroundImage:`url(${heroBackground})`,
                                        backgroundSize:'cover',
                                        backgroundPosition:'center'
                }}>

                        {/* Text and Button Section */}
                           <div className="text-white lgs:h-auto  bg-transparent lgs:space-y-6">

                            <h1 className="flex flex-col text-5xl font-russoone lg:text-5xl font-semibold mb-6">
                            Your Health, Our Priority{''}
                            <div className="bg-primary h-[0.18rem] lgs:w-1/2 lgs:mt-2"/>
                            </h1>
                            <p className="text-lg mb-6 lgs:w-[35vw]" style={{ fontWeight:'400'}}>
                            At MediLink, we are dedicated to providing personalized, compassionate healthcare tailored to your needs. Whether you’re looking for routine checkups, specialist consultations, or urgent care, our team of experienced doctors is here for you. Schedule your appointments effortlessly and start your journey toward better health today</p>


                            <Link to='/' className="flex lgs:mt-12 bg-blue-600 lgs:w-[12rem] items-center justify-center lgs:h-[3rem] font-ibmplexsans rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
                            style={{
                            boxShadow:'inset 0 2px 5px rgba(255,255,255,0.5), 0px 5px 10px rgba(0,0,0,0.4)'
                            }}>
                            Book an Appointment
                            </Link>
                            </div>

                </div>



            </div>

           {/* Main 02 section */}
            <div className="flex flex-col h-auto lgs:w-[50vw] items-center justify-center bg-primary lgs:h-[80vh]"
            style={{
              boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 10px rgba(0,0,0,0.4)'
            }}>
                <div className=" flex lgs:w-auto mt-8 lg:mt-0 justify-center items-center bg-transparent lgs:h-[80vh]">
                <img 
                src={heroImage} alt="heroImage" className="object-cover lgs:w-[35vw]"
                />
                </div>
            </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">General Checkup</h3>
              <p className="text-gray-600">Routine medical exams to ensure your well-being.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Pediatrics</h3>
              <p className="text-gray-600">Healthcare for your children with compassionate care.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Specialist Consultation</h3>
              <p className="text-gray-600">Consult with top specialists for more advanced medical care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-500 py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Get Started with Your Health Journey</h2>
          <p className="text-lg mb-6">
            Book your appointment now and take the first step towards better health.
          </p>
          <a
            href="/appointments"
            className="bg-white text-green-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
