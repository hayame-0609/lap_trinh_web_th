import { useState, useEffect } from "react";

export default function useVanBangModel() {

  const [soVanBangList, setSoVanBangList] = useState<any[]>([]);
  const [quyetDinhList, setQuyetDinhList] = useState<any[]>([]);
  const [vanBangList, setVanBangList] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    setSoVanBangList(JSON.parse(localStorage.getItem("soVanBangList") || "[]"));
    setQuyetDinhList(JSON.parse(localStorage.getItem("quyetDinhList") || "[]"));
    setVanBangList(JSON.parse(localStorage.getItem("vanBangList") || "[]"));
    setFields(JSON.parse(localStorage.getItem("fields") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("soVanBangList", JSON.stringify(soVanBangList));
  }, [soVanBangList]);

  useEffect(() => {
    localStorage.setItem("quyetDinhList", JSON.stringify(quyetDinhList));
  }, [quyetDinhList]);

  useEffect(() => {
    localStorage.setItem("vanBangList", JSON.stringify(vanBangList));
  }, [vanBangList]);

  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
  }, [fields]);

  return {
    soVanBangList,
    setSoVanBangList,
    quyetDinhList,
    setQuyetDinhList,
    vanBangList,
    setVanBangList,
    fields,
    setFields,
  };
}