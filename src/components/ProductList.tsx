
import React, { useEffect, useCallback } from 'react'
import { Input, List } from 'antd'
import { useStores } from '../helpers/common'
import { observer } from "mobx-react-lite"
import { debounce } from 'lodash'
import { Product } from '../interfaces/Product'

const ProductList: React.FC = observer(() => {
  const {
    productStore: {
      searchProduct,
      products,
      loading,
      searchQuery,
      setSearchQuery,
      page,
      setPage,
    },
  } = useStores()

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isAtBottom = windowHeight + scrollTop >= documentHeight
    if (isAtBottom) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    searchProduct()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  const search = useCallback(debounce(searchProduct, 400), [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    search()
  }

  return (
    <div>
      <Input
        placeholder="Search by product name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <List
        loading={loading}
        dataSource={products}
        renderItem={({ id, images: [image], title, price }: Product) => (
          <List.Item key={id}>
            <List.Item.Meta
              avatar={<img src={image} alt={title} style={{ width: 50, height: 50 }} />}
              title={title}
              description={`$${price}`}
            />
          </List.Item>
        )}
      />
    </div>
  )
})

export default ProductList