'use client'

export default function Navbar() {
  return (
    <>
      <header>
        <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed-w-full z-20 top-0">
          <div className="flex flex-wrap items-center">
            <a href="#" aria-label="Home">
              <span className="text-xl pl-2">HOME
              </span>
            </a>
            <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                  <span className="relative w-full">
                      <input aria-label="search" type="search" id="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
                  </span>
              </div>

              <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                  <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                      <li className="flex-1 md:flex-none md:mr-3">
                          <a className="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                      </li>
                      <li className="flex-1 md:flex-none md:mr-3">
                          <a className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
                      </li>
                      <li className="flex-1 md:flex-none md:mr-3">
                          <div className="relative inline-block">
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
        </nav>
      </header>
    </>
  )
}
