import React from 'react';
import team1 from '../../img/home-two/team-1.jpg'
import team2 from '../../img/home-two/team2.jpg'
import team3 from '../../img/home-two/team3.jpg'
import team4 from '../../img/home-two/team4.jpg'
import team5 from '../../img/home-two/team5.jpg'

function Team() {
  const teamMembers = [
    { name: "Thomas Smith", role: "Manager", imgSrc: team1 },
    { name: "Jansy Henry", role: "Engineer", imgSrc: team1 },
    { name: "Diyana Pari", role: "Staff", imgSrc: team1 },
    { name: "Marc Jacobs", role: "Designer", imgSrc: team1 },
    { name: "Marc Jacobs", role: "Doctor", imgSrc: team1 },

  ];

  return (
    <section className="bg-gray-300 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Expert Team Members</h2>
        <div className="flex flex-wrap justify-center -mx-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg hover:-translate-y-2">
                <img src={member.imgSrc} alt="Team" className="w-32 h-32 rounded-full mx-auto mb-4 transition duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <a href="#" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-facebook'></i></a>
                  <a href="#" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-twitter'></i></a>
                  <a href="#" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-linkedin'></i></a>
                  <a href="#" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-instagram'></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team;
