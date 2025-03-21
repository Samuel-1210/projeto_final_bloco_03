import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { X, Check } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../util/ToastAlerta";

function DeletarProduto() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {});
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

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`, {
        headers: {},
      });

      ToastAlerta("Produto apagado com sucesso", "info");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Erro ao deletar o produto.", "error");
      } else {
        ToastAlerta("Erro ao deletar o produto.", "error");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4 text-red-900">
        Deletar Produto
      </h1>

      <p className="text-center font-semibold mb-4 text-red-900 ">
        Você tem certeza de que deseja apagar o produto a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-red-400 text-white font-bold text-2xl">
          Produto
        </header>
        <div className="p-4">
          <p className="text-xl h-full">{produto.nome}</p>
          <p>{produto.categoria?.nome}</p>
        </div>
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
            onClick={deletarProduto}
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

export default DeletarProduto;
