import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

export function isNotAuth(Component: any) {
  return function IsNotAuth(props: any) {
    const { user } = useAuth();
    const { push } = useRouter();
    const auth = Boolean(user);

    useEffect(() => {
      if (auth) {
        push("/");
      }
    }, []);

    if (auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
