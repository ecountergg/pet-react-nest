import { Card, CardHeader, CardTitle } from "@/components/atoms/card/card";
import { BookForm } from "@/components/molecules/book-form/book-form";
import { Admin } from "@/components/templates/admin/admin";
import { Container } from "@/components/templates/container/container";

export const AdminBookCreate = () => {
  return (
    <Admin>
      <Container>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Book - Create</CardTitle>
          </CardHeader>
          <BookForm />
        </Card>
      </Container>
    </Admin>
  );
};
