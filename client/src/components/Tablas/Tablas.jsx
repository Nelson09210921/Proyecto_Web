import React, { useRef, useState } from 'react'
import './Style.css'
import MUIDataTble from 'mui-datatables'



export const Tablas = ({data, columns, options}) => {

  const tableRef = useRef(null);

  return (
    <>
    <MUIDataTble
      title="Listado de Produtos"
      columns={columns}
      data={data}
      options={options}
      ref={tableRef}
    />
    </>
  )
}