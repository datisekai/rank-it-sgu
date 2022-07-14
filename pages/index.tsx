import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { DataGrid } from "@mui/x-data-grid";

const columns: any[] = [
  { field: "id", headerName: "Mã sinh viên", width: 200 },
  { field: "name", headerName: "Họ và tên", width: 250 },
  { field: "diemtb", headerName: "Điểm trung bình", width: 200 },
  { field: "rank", headerName: "Xếp hạng", width: 200 },
];

const Home: NextPage = ({ students }: any) => {
  const result = students.map((item: any, index: number) => ({
    id: item.mssv,
    name: item.name,
    diemtb: item.diemtb,
  }));

  const data = result.filter((item: any) => item.id.indexOf("312041") !== -1);

  const sorts = data.sort((a: any, b: any) => +b.diemtb - +a.diemtb);

  const rows = sorts.map((item: any, index: number) => ({
    ...item,
    rank: index + 1,
  }));

  return (
    <div className={styles.container}>
      <Head>
        <title>Bảng xếp hạng</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className='text-lg font-medium py-5'>
          Bảng xếp hạng theo điểm tích lũy sinh viên IT K20
        </h1>
        <p className='py-2'>
          Code by{" "}
          <a
            href='https://www.facebook.com/datisekai/'
            className='text-blue-600'
          >
            Datisekai
          </a>
        </p>
        <div
          style={{
            height: 650,
            width: "100%",
            padding: "0px 20px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const students = await axios.get(
    "https://sguserver-production-dc8e.up.railway.app/students"
  );

  return {
    props: {
      students: students.data,
    },
  };
};
