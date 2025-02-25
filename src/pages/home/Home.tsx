function Home() {
  return (
    <>
      <div>
        <div className="flex justify-center bg-white">
          <div className="container grid grid-cols-2 text-red-900">
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <h2 className="text-5xl font-bold font-['Sixtyfour Convergence']">
                Seja Bem Vindo(a)!
              </h2>
              <p className="text-xl">Remédio bom e barato é aqui</p>

              <div id="" className="flex justify-around gap-4">
                <div className="flex justify-around gap-4"></div>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://media.discordapp.net/attachments/1306319291171471411/1343911654408065044/home.png?ex=67befec3&is=67bdad43&hm=d18ac6e8fb675966ebed620960266ac7cc7d686754a7bbd7fde188c28b88c53d&=&format=webp&quality=lossless&width=564&height=566"
                alt="Imagem da Página Home"
                className="w-2/3 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
