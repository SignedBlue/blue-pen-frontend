import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import { help_single_user } from "@/constants/Helps";
import { VerifyDocumentStatus } from "@/utils/VerifyDocumentStatus";
import { formatCPF, formatDate, formatPhoneNumber, formatPostalCode } from "@/utils/formatters";
import { getData } from "@/utils/getData";

export default async function UserInfosPage({ params: { userId } }: { params: { userId: string } }) {
  const user: TUserData = await getData(`/users/${userId}`);

  return (
    <main>
      <Navbar title={user.name} routerBack>
        <Modal title="Dados do cliente" content={help_single_user} />
      </Navbar>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-2"><span className="font-semibold">Nome:</span> {user.name}</p>
            <p className="mb-2">
              <span className="font-semibold">E-mail: </span>
              <a href={`mailto:${user.email}`} className="hover:text-neutral-400 ease-out duration-200">{user.email}</a>
            </p>
            <p className="mb-2"><span className="font-semibold">CPF:</span> {formatCPF(user.cpf)}</p>
            <p className="mb-2">
              <span className="font-semibold">Status do Documento: </span>
              <span className={`${user.document_status === "APPROVED" ? "text-green-500" : user.document_status === "REJECTED" ? "text-red-500" : "text-yellow-400"}`}>
                {VerifyDocumentStatus(user.document_status as string)}
              </span>
            </p>
          </div>
          <div>
            <p className="mb-2"><span className="font-semibold">Data de Nascimento:</span> {formatDate(new Date(user.birthdate))}</p>
            <p className="mb-2">
              <span className="font-semibold">Telefone: </span>
              <a href={`tel:${user.phone}`} className="hover:text-neutral-400 ease-out duration-200">
                {formatPhoneNumber(user.phone)}
              </a>
            </p>
            <p className="mb-2"><span className="font-semibold">Endereço:</span> {user.address.street}, {user.address.number}, {user.address.complement}, {user.address.city}</p>
            <p className="mb-2"><span className="font-semibold">CEP:</span> {formatPostalCode(user.address.postal_code)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}