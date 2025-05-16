"use client"

import React from "react"
import directory from "../assets/imgs/directory"
import textGeneral from "../text/textGeneral"

const Info = () => {
  return (
    <div className="w-[90%] min-h-[200px] bg-main/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 animate-fadeInUp">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {textGeneral.info.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center gap-5 w-[280px] group hover:scale-105 transition-transform duration-300"
          >
            <img
              src={directory[item.icon]}
              alt={item.title}
              className="w-[60px] min-w-[40px] max-w-[60px] group-hover:animate-hithere transition-transform duration-300"
            />
            <div>
              <h3 className="text-black/90 font-extrabold text-lg">{item.title}</h3>
              <span className="text-black/70">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Info
