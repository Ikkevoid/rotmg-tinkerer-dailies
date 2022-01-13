import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { data } from "../misc/questsData";

export default function Home() {
  const [selected, setSelected] = useState(0)
  const [items, setItems] = useState([
    { name: "Scout Quests", quest: null },
    { name: "Beginner Quests", quest: null },
    { name: "Standard Quests", quest: null },
    { name: "Standard Quests", quest: null },
    { name: "Mighty Quests", quest: null },
    { name: "Mighty Quests", quest: null },
    { name: "Epic Quests", quest: null },
    { name: "Craft Quests", quest: null },
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(false)

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4 h-screen text-white bg-gradient-to-b from-black to-zinc-800">
      <Head>
        <title>RotMG Tinkerer dailies tracker</title>
        <meta name="description" content="Track tinkerer daily quests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className='flex gap-2 justify-between items-center p-2 w-full max-w-screen-xl border-4 retro-clip-4 bg-neutral-700 border-neutral-600'>
        <div className='flex cursor-pointer sm:hidden' onClick={toggleSidebar}>
          <Image src="Menu Icon.png" className='' alt="" width={40} height={40} unoptimized />
        </div>
        <h2>RotMG Tinkerer Quests</h2>
      </nav>

      <div className='flex overflow-y-hidden gap-2 w-full max-w-screen-xl h-full'>
        <List items={items} selected={selected} setSelected={setSelected} sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />


        <main className={`overflow-y-scroll p-4 w-full border-4 border-neutral-600 sm:block bg-neutral-700 retro-clip-4 ${sidebarVisible ? "hidden" : ""}`}>
          {!items[selected].quest ?
            <QuestSelect selected={selected} items={items} setItems={setItems} /> :
            <QuestDetails selected={selected} items={items} setItems={setItems} />}
        </main>
      </div>

    </div>
  )
}

// Sidebar containing list of quests
const List = ({ items, setSelected, selected, sidebarVisible, toggleSidebar }) => {
  function handleClick(e) {
    e.preventDefault();
    setSelected(e.currentTarget.getAttribute('type'))
    toggleSidebar()
  }

  return (
    <ul className={`flex-col gap-4 w-full max-w-sm sm:flex overflow-y-auto ${sidebarVisible ? "flex" : "hidden"}`}>
      {
        items.map((item, idx) => (
          <li key={idx} className={`flex duration-100 text-center cursor-pointer retro-clip-4 bg-neutral-600 focus:bg-amber-500 focus:brightness-110 outline-none hover:brightness-110 ${selected == idx && "bg-amber-500"}`} onClick={handleClick} tabIndex="0" type={idx}>
            <div className='flex justify-center items-center w-20 aspect-square'>
              <Image src={item.quest ? "/items/" + item.quest.items[0].name + ".png" : "/Exclamation Mark.png"} className='' alt="" width={40} height={40} unoptimized />
            </div>
            <h2 className='flex flex-grow justify-center items-center my-1 mr-1 bg-black/20'>{item.quest ? item.quest.name : item.name}</h2>
          </li>
        ))
      }
    </ul>
  )
}

const QuestDetails = ({ selected, items, setItems }) => {
  const renderItems = (item) => {
    let elements = [];
    for (let i = 0; i < (item.count ?? 1); i++) {
      elements.push(
        <div className='h-12 border-4 border-neutral-400 bg-neutral-500 aspect-square retro-clip-4' key={item.name + " " + i}>
          <Image src={"items/" + item.name + ".png"} alt="" width={40} height={40} unoptimized />
        </div>
      );
    }
    return elements;
  }

  const resetQuest = () => {
    const newItems = [...items];
    newItems[selected].quest = null;
    setItems(newItems);
  }

  return (
    <div className='flex flex-col gap-24 items-center text-center'>
      <div className='flex flex-row self-start px-2 border-4 cursor-pointer shadow-black/20 border-neutral-500 text-neutral-300 bg-neutral-600 hover:brightness-110 retro-clip-4' onClick={resetQuest}>Change quest</div>
      <div>
        <h2 className='w-full text-4xl text-amber-500'>{items[selected].quest.name}</h2>
        <p>{items[selected].quest.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center w-64" >
        {items[selected].quest.items.map((item) => renderItems(item))}
      </div>

      <fieldset className="flex gap-2 justify-center py-6 px-16 w-40 border-4 border-neutral-500 retro-clip-4" >
        <legend className='px-4 leading-[0] mx-auto'>Rewards</legend>
        {items[selected].quest.reward.map((item) => renderItems(item))}
      </fieldset>

    </div>
  )
}

const QuestSelect = ({ selected, items, setItems }) => {
  const result = data.find(obj => {
    return obj.name === items[selected].name
  })

  const handleUpdate = (e) => {
    e.preventDefault();
    const newItems = [...items];
    newItems[selected].quest = result.quests[e.currentTarget.getAttribute("value")];
    setItems(newItems);
  }

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      {result.quests.map((quest, idx) =>
        <div key={idx} value={idx} onClick={handleUpdate} className="flex flex-col justify-center items-center p-2 w-52 border-4 duration-100 cursor-pointer border-neutral-800 hover:bg-neutral-800/80 retro-clip-4 bg-neutral-800/40" >
          <h2 className='leading-none text-center'>{quest.name}</h2>
          <div className='flex flex-wrap justify-center items-center'>
            {quest.items.map((items) => {
              let elements = []
              for (let i = 0; i < (items.count ?? 1); i++) {
                elements.push(<Image src={"items/" + items.name + ".png"} alt="" width={40} height={40} key={items.name + " " + i} unoptimized />)
              }
              return elements
            })}
          </div>
        </div>
      )}
    </div>
  )
}