import { Card, CardHeader, CardTitle } from "@/components/atoms/card/card";
import { BookForm } from "@/components/molecules/book-form/book-form";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminBookEdit = () => {
  const navigate = useNavigate();

  return (
    <Admin>
      <Container>
        <ChevronLeft role="button" onClick={() => navigate(-1)} />

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Book - Update</CardTitle>
          </CardHeader>
          <BookForm />
        </Card>
      </Container>
    </Admin>
  );
};
