import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

import { useAuth } from "@/hooks";

export function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user } = useAuth();
    const { push } = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        push("/signin");
      }
    }, []);

    if (!Boolean(user)) {
      return null;
    }

    return <Component {...props} />;
  };
}
