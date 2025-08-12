"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string; // ID do evento vindo das props
};

export default function DeleteEventButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const token = localStorage.getItem("token"); // ou de onde você armazena
    if (!token) {
      alert("Você precisa estar logado para deletar um evento.");
      return;
    }

    const confirmDelete = confirm("Tem certeza que deseja deletar este evento?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/event/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        ;

      const data = await res.json();

      if (res.ok) {
        alert("Evento deletado com sucesso!");
        router.refresh(); // Atualiza a página para remover o evento
      } else {
        alert(data.error || "Erro ao deletar evento");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Deletar
    </button>
  );
}
