
//images
import { useState } from 'react';
import Doctor1 from '../assets/doctor1.png';


const Appointment = () => {

  //hooks
  const [options1 , setOptions1] = useState([]);
  const [options2 , setOptions2] = useState([]);


  return (
    <div className='bg-primary w-full min-h-screen justify-center items-center'>



      <div className= 'hidden lgs:flex mds:flex bg-transparent lgs:w-[100vw] lgs:h-[4rem]'/>

      {/* Booking Appointment Interface */}

          <div className= 'relative flex h-auto w-auto justify-center items-center'>

             {/* Booking Appointements */}

              <div className= 'flex lgs:w-[75vw] lgs:h-[75vh] overflow-hidden bg-primary drop-shadow-lg items-center justify-center lgs:mt-5 lgs:rounded-3xl' style={{
                boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 20px rgba(0,0,0,0.5)'
              }}>



                                    {/* Booking 1st Interface */}

                                    <div className= 'flex flex-col lgs:w-[30vw] lgs:h-[75rem] bg-baseprimary lgs:p-2 drop-shadow-lg justify-center lgs:items-center lgs:rounded-l-3xl'>
                                       
                                       {/* Topic Section */}
                                        <div className= 'flex flex-col h-auto lgs:w-[25vw] justify-center items-center'>
                                            <h2 className= 'flex flex-col font-ibmplexsans lgs:text-md text-primary'>
                                              Your Health, Your Schedule{''}<div className='bg-primary h-[0.15rem] w-auto'/>
                                            </h2>
                                            <h2 className= 'font-russoone lgs:text-3xl text-primary font-normal'>
                                            Book Your Appointment
                                            </h2>
                                        </div>

                                     {/* Image Section */}
                                         <div className= 'flex flex-col h-auto lgs:w-[30vw] justify-center items-center lgs:pt-5'>
                                            <img src= {Doctor1} alt='' className='lgs:w-[20vw]'/>
                                        </div>

                                     {/* Paragraph Section */}
                                        <div className= 'flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5'>
                                           <p className='font-ibmplexsans text-primary text-md text-center' style={{
                                            fontWeight:'200'
                                           }}>
                                           Schedule your doctor appointments quickly and conveniently through our easy-to-use interface. Select your preferred doctor, choose a suitable date and time, and provide any necessary details—all in just a few steps. Get reminders and manage your bookings effortlessly from anywhere!
                                           </p>
                                        </div>

                                    {/* design  Section */}
                                       <div className= 'flex h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5 lgs:space-x-5'>
                                        <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-right'/>
                                        <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>    
                                        <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>             
                                        <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-left'/>
                                           
                                        </div>



                                    </div>


                                    {/* Booking 2nd Interface */}

                                    <div className='flex lgs:w-[45vw] lgs:h-[75vh] bg-primary lgs:p-2 drop-shadow-lg justify-center items-center lgs:rounded-r-3xl'>
                                                
                                                <form className="flex flex-col space-y-6 w-full h-auto px-8">
                                                    {/* First Dropdown */}
                                                    <div>
                                                        <label htmlFor="firstDropdown" className="block lgs:text-xl font-ibmplexsans text-baseprimary">Select Specialization</label>
                                                        <select id="firstDropdown" name="firstDropdown" className="lgs:mt-1 lgs:h-[3rem] block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm">
                                                            <option value="" className='font-ibmplexsans lgs:text-lg'>Choose an option</option>
                                                            {options1.map(option => (
                                                              <option key={option.id} value={option.id}>
                                                                {option.name}
                                                              </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Second Dropdown */}
                                                    <div>
                                                        <label htmlFor="secondDropDown" className="block lgs:text-xl font-ibmplexsans text-baseprimary">Select Doctor</label>
                                                        <select id="secondDropDown" name="secondDropDown" className="lgs:mt-1 lgs:h-[3rem] block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm">
                                                            <option value="" className='font-ibmplexsans lgs:text-lg'>Choose an option</option>
                                                            {options2.map(option => (
                                                              <option key={option.id} value={option.id}>
                                                                {option.name}
                                                              </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Text Field */}
                                                    <div>
                                                    <label htmlFor="dateField" className="block lgs:text-xl font-ibmplexsans text-baseprimary">Pick a Date</label>                                                      <input
                                                        type="date"
                                                        id="dateField"
                                                        name="dateField"
                                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                      />
                                                    </div>


                                                    {/* confirm Button */}
                                                    <div>
                                                        <button type="submit" className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
</div>

                
              </div>            
          </div>

      
      
    </div>
  )
}

export default Appointment
