import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import Produto from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: "" });

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: {},
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Nenhum produto encontrado.", "error");
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {},
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Nenhuma categoria encontrada.", "error");
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: {},
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Nenhuma categoria encontrada.", "error");
      }
    }
  }

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {},
        });

        ToastAlerta("O produto foi atualizado com sucesso", "info");
      } catch (error: any) {
        if (error.toString().includes("403")) {
        } else {
          ToastAlerta("Erro ao atualizar o Produto", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {},
        });

        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
        } else {
          ToastAlerta("Erro ao cadastrar o Produto", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }
  const carregandoCategoria = categoria.nome === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8 text-red-900">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4 text-red-900 mb-4"
        onSubmit={gerarNovoProduto}
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="nome">Nome do Remédio</label>
          <input
            type="text"
            placeholder="Nome do Remédio"
            name="nome"
            required
            className="border-2 text-red-900 border-red-900 rounded p-2"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preco do Remédio</label>
          <input
            type="number"
            placeholder="Preco"
            name="preco"
            required
            className="border-2 text-red-900 border-red-900 rounded p-2"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto do Remédio</label>
          <input
            type="text"
            placeholder="Link da foto"
            name="foto"
            required
            className="border-2 text-red-900 border-red-900 rounded p-2"
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do Remédio</p>
          <select
            name="categoria"
            id="categoria"
            className="border-2 text-red-900 border-red-900 p-2 rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione uma Categoria
            </option>

            {categorias.map((categoria) => (
              <>
                <option value={categoria.id}>{categoria.nome}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-red-200 disabled:text-red-400 bg-red-700 hover:bg-red-900
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoCategoria}
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
