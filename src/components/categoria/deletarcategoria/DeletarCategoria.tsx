import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { Check, X } from "@phosphor-icons/react";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {});
    } catch (error: any) {
      if (error.toString().includes("403")) {
      }
    }
  }
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, {});

      alert("Categoria apagado com sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
      } else {
        alert("Erro ao deletar o categoria.");
      }
    }

    setIsLoading(false);
    retornar();
  }
  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4 text-red-900">
        Deletar categoria
      </h1>
      <p className="text-center font-semibold mb-4 text-red-900">
        Você tem certeza de que deseja apagar o categoria a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-red-400 text-white font-bold text-2xl">
          Categoria
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">{categoria.nome}</p>
        <div className="flex">
          <button
            className="flex items-center justify-center text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            <X size={30}></X>
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarCategoria}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <Check size={30}></Check>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarCategoria;
