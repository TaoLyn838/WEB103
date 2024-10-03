document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header')

  // Create a background section with flexbox settings
  const bgSection = document.createElement('div')
  bgSection.className =
    'w-full h-[520px] bg-[url("../images/header_image.png")] bg-cover bg-no-repeat bg-center flex justify-start items-start pt-4 pl-4'

  // Create the button and position it in the top left
  const headerButton = document.createElement('a')
  headerButton.textContent = 'Home'
  headerButton.href = '/'
  headerButton.className =
    'bg-white text-black font-extrabold px-5 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition'

  // Append the button directly to the background section for positioning
  bgSection.appendChild(headerButton)

  // Append the background section to the header
  header.appendChild(bgSection)
})

// <section class="w-full">
//     <div class="w-full h-[520px] bg-[url('https://play-lh.googleusercontent.com/pscn_SAQZ5S2Eqv9_JGQGje3jHneGnfd7GGJoxMUX1iOG39w3sKhkPGPmHm1d3n73FeX=w5120-h2880-rw')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
//     <!-- Photo by '@insolitus' on Unsplash -->
//         <div>
//             <h1 class="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Discover Your New Home</h1>
//         </div>

//     </div>
// </section>
