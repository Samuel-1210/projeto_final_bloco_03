import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { Pencil, Trash, X } from "@phosphor-icons/react";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-red-400 text-white font-bold text-2xl">
        Categoria
      </header>
      <p className="p-8 text-3xl bg-slate-200 h-full">{categoria.nome}</p>

      <div className="flex items-center justify-center bg-red-400 py-2">
        <div className="bg-red-400">
          <Link
            to={`/editarcategoria/${categoria.id}`}
            className="w-full text-slate-100 bg-red-400 hover:text-red-600 
                         "
          >
            <Pencil size={30}></Pencil>
          </Link>
        </div>
        <div className="bg-red-400">
          <Link
            to={`/deletarcategoria/${categoria.id}`}
            className="text-slate-100 bg-red-400 w-full hover:text-red-600
		"
          >
            <Trash size={30}></Trash>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardCategoria;
