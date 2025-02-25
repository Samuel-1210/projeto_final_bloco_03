import { ShoppingCart, User } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-center w-full py-4 text-white bg-red-800">
      <div className="container flex items-center justify-between mx-4 text-lg">
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="https://cdn.discordapp.com/attachments/1306319291171471411/1343911653153968251/favicon.png?ex=67befec2&is=67bdad42&hm=8b68e47a5e3b144b678eb4efcac616c888136c3b4da0b7217150399539d6b38f&"
            alt="Logo"
            className="w-14"
          />
          FARMÁCIA
        </Link>

        <div className="relative flex items-center justify-center w-2/5 text-black">
          <form className="flex items-center justify-center w-full">
            <input
              className="w-10/12 px-4 py-4 bg-white rounded-lg h-9 focus:outline-none"
              type="search"
              placeholder="Pesquisar produto"
              id="busca"
              name="busca"
            />
            <button
              type="submit"
              className="h-9 w-9 p-2.5 ms-2 text-sm font-medium text-white bg-red-600 hover:bg-red-900 rounded-lg border border-red-200"
            >
              <MagnifyingGlass size={14} weight="bold" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4 py-4">
          <Link to="/categorias" className="hover:text-red-300">
            Categorias
          </Link>
          <Link to="/cadastrarcategoria" className="hover:text-red-300">
            Cadastrar Categoria
          </Link>

          <Link to="/produtos" className="hover:text-red-300">
            Produtos
          </Link>

          <Link to="/cadastrarproduto" className="hover:text-red-300">
            Cadastrar Produto
          </Link>
          <Link to="/perfil" className="hover:text-red-300">
            <User className="hover:text-red-300 " size={32} weight="bold" />
          </Link>

          <Link to="/" className="hover:text-red-300">
            <ShoppingCart
              className="hover:text-red-300 "
              size={32}
              weight="bold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
