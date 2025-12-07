import { Badge } from "react-bootstrap";
import { type FC } from "react";

interface StatusBadgeProps {
  status: string | undefined;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "DRAFT":
      return <Badge bg="secondary" className="custom-badge">Черновик</Badge>;
    case "FORMED":
      return <Badge bg="secondary" className="custom-badge">Сформировано</Badge>;
    case "COMPLETED":
      return <Badge bg="success" className="custom-badge">Завершено</Badge>;
    case "REJECTED":
      return <Badge bg="danger" className="custom-badge">Отклонено</Badge>;
    case "DELETED":
      return <Badge bg="dark" className="custom-badge">Удалено</Badge>;
    default:
      return status ? <Badge bg="light" text="dark" className="custom-badge">{status}</Badge> : null;
  }
};
