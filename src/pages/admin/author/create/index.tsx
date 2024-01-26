import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle } from "@/components/atoms/card/card";
import { AuthorForm } from "@/components/molecules/author-form/author-form";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";
import { ChevronLeft } from "lucide-react";

export const AdminAuthorCreate = () => {
  const navigate = useNavigate();

  return (
    <Admin>
      <Container>
        <ChevronLeft role="button" onClick={() => navigate(-1)} />
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Author - Create</CardTitle>
          </CardHeader>
          <AuthorForm />
        </Card>
      </Container>
    </Admin>
  );
};
