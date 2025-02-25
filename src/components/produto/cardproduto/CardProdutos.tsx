import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";
import { Link } from "react-router-dom";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="flex bg-red-200  overflow-hidden border-red-800 border rounded-2xl w-[233px] h-[430px] p-3 flex-col relative">
      <div className="flex justify-end items-center">
        <Link
          className="hover:text-red-600"
          to={`/editarproduto/${produto.id}`}
        >
          <Pencil size={26} />
        </Link>
        <Link
          className="hover:text-red-600"
          to={`/deletarproduto/${produto.id}`}
        >
          <Trash size={26} />
        </Link>
      </div>
      <div className="flex flex-col items-center p-4 ">
        <img src={produto.foto} alt="" className="" />
        <div className="flex flex-col items-center">
          <h4>{produto.nome}</h4>
          <h1 className="text-lg font-semibold"> {produto.preco}</h1>
          <p>{produto.categoria?.nome}</p>
        </div>
      </div>
      <div className="">
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-900 transition absolute bottom-3 left-1/2 transform -translate-x-1/2">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default CardProdutos;
