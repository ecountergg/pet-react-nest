import { Card, CardHeader, CardTitle } from "@/components/atoms/card/card";
import { AuthorForm } from "@/components/molecules/author-form/author-form";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminAuthorEdit = () => {
  const navigate = useNavigate();

  return (
    <Admin>
      <Container>
        <ChevronLeft role="button" onClick={() => navigate(-1)} />

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Author - Update</CardTitle>
          </CardHeader>
          <AuthorForm />
        </Card>
      </Container>
    </Admin>
  );
};
