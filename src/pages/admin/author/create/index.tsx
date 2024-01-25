import { Card, CardHeader, CardTitle } from "@/components/atoms/card/card";
import { AuthorForm } from "@/components/molecules/author-form/author-form";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";

export const AdminAuthorCreate = () => {
  return (
    <Admin>
      <Container>
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
