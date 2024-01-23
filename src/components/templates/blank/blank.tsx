import { Wrapper } from "../wrapper/wrapper";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Blank = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
