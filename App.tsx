
import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

const csvDataKaiwin = `img src,item_col href,item_col,product_name href,product_name,current_price
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-pickleball-future-xanhden.jpg?v=1754238943163,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-the-thao-pickleball-kaiwin-future-mau-xanh-den,Giày Thể Thao Pickleball Kaiwin Future - Màu Xanh Đen,699.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-pickleball-future-xanhchuoi.jpg?v=1754238781693,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-the-thao-pickleball-kaiwin-future-mau-xanh-chuoi,Giày Thể Thao Pickleball Kaiwin Future - Màu Xanh Chuối,699.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-pickleball-future-trang-6f48b34e-5d97-4a3e-8ca6-db86201ac9e5.jpg?v=1754238535847,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-the-thao-pickleball-kaiwin-future-mau-trang,Giày Thể Thao Pickleball Kaiwin Future - Màu Trắng,699.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-pickleball-future-do-29a372d9-3c51-437d-9079-d1a2814b0115.jpg?v=1754238312357,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-the-thao-pickleball-kaiwin-future-mau-do,Giày Thể Thao Pickleball Kaiwin Future - Màu Đỏ,699.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/do-1-06f0b88e-7d73-451a-94f6-0e6f4ad4d910.jpg?v=1754236361097,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-area-mau-do,Giày Thể Thao Pickleball Kaiwin Area - Màu Đỏ,1.599.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/xanh-chuoi-1.jpg?v=1754236621377,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-area-mau-xanh-chuoi,Giày Thể Thao Pickleball Kaiwin Area - Màu Xanh Chuối,1.599.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/xanh-ngo-c-1.jpg?v=1754236831477,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-area-mau-xanh-ngoc,Giày Thể Thao Pickleball Kaiwin Area - Màu Xanh Ngọc,1.599.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/xanh-bich-1.jpg?v=1748937341597,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-area-mau-xanh-bich,Giày Thể Thao Pickleball Kaiwin Area - Màu Xanh Bích,1.599.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/tra-ng-1.jpg?v=1754238000500,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-area-mau-trang,Giày Thể Thao Pickleball Kaiwin Area - Màu Trắng,1.599.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/4-tra-ng-1.jpg?v=1754239154413,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-slight-mau-trang,Giày Thể Thao Pickleball Kaiwin Slight - Màu Trắng,899.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/3-xanh-chuo-i-1.jpg?v=1754239547227,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-slight-mau-xanh-chuoi,Giày Thể Thao Pickleball Kaiwin Slight - Màu Xanh Chuối,899.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/1-xanh-den-1.jpg?v=1754239717633,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-slight-mau-xanh-den,Giày Thể Thao Pickleball Kaiwin Slight - Màu Xanh Đen,899.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/2-do-1-b968ee0e-4f45-4720-91b4-5c7b064d74a0.jpg?v=1754239374183,https://kaiwinsport.com/giay-pickleball,Giày Pickleball,https://kaiwinsport.com/giay-pickleball-kaiwin-slight-mau-do,Giày Thể Thao Pickleball Kaiwin Slight - Màu Đỏ,899.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-witcher-xanhbich.jpg?v=1754239994807,https://kaiwinsport.com/giay-cau-long,Giày Cầu Lông,https://kaiwinsport.com/giay-the-thao-witcher-mau-xanh-bich,Giày Thể Thao Kaiwin Witcher - Màu Xanh Bích,499.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-witcher-xanhden.jpg?v=1754240172037,https://kaiwinsport.com/giay-cau-long,Giày Cầu Lông,https://kaiwinsport.com/giay-the-thao-witcher-mau-xanh-den,Giày Thể Thao Kaiwin Witcher - Màu Xanh Đen,499.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-witcher-trang.jpg?v=1754240361560,https://kaiwinsport.com/giay-cau-long,Giày Cầu Lông,https://kaiwinsport.com/giay-the-thao-witcher-mau-trang,Giày Thể Thao Kaiwin Witcher - Màu Trắng,499.000₫
https://bizweb.dktcdn.net/thumb/large/100/017/070/products/giay-witcher-do.jpg?v=1754240516110,https://kaiwinsport.com/giay-cau-long,Giày Cầu Lông,https://kaiwinsport.com/giay-the-thao-witcher-mau-do,Giày Thể Thao Kaiwin Witcher - Màu Đỏ,499.000₫
`;

const csvDataWikasports = `onsale,image-zoom_in href,attachment-woocommerce_thumbnail src,show-on-hover src,woocommerce-LoopProduct-link,woocommerce-Price-amount,woocommerce-Price-amount (2),star-rating,rating
-7%,https://wikasports.com/san-pham/giay-pickleball-wika-vanta-navy/,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-navy-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-navy-3-600x600.jpg,Giày Pickleball Wika Vanta navy,1.500.000₫,1.399.000₫,,
-7%,https://wikasports.com/san-pham/giay-pickleball-wika-vanta-den/,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-den-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-den-5-600x600.jpg,Giày Pickleball Wika Vanta đen,1.500.000₫,1.399.000₫,,
-7%,https://wikasports.com/san-pham/giay-pickleball-wika-vanta-trang-tim/,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-trang-tim-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-trang-tim-7-600x600.jpg,Giày Pickleball Wika Vanta trắng tím,1.500.000₫,1.399.000₫,,
-7%,https://wikasports.com/san-pham/giay-pickleball-wika-vanta-trang-navy/,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-trang-navy-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/09/giay-pickleball-wika-vanta-trang-navy-3-600x600.jpg,Giày Pickleball Wika Vanta trắng navy,1.500.000₫,1.399.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-merik-navy/,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-navy-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-navy-2-600x600.jpg,Giày Pickleball Wika Merik navy,1.700.000₫,1.599.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-merik-cam/,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-cam-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-cam-3-600x600.jpg,Giày Pickleball Wika Merik cam,1.700.000₫,1.599.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-merik-trang-hong/,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-trang-hong-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-trang-hong-6-600x600.jpg,Giày Pickleball Wika Merik trắng hồng,1.700.000₫,1.599.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-merik-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-xanh-ngoc-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-xanh-ngoc-5-600x600.jpg,Giày Pickleball Wika Merik xanh ngọc,1.700.000₫,1.599.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-merik-trang-xanh/,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-trang-xanh-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/08/giay-pickleball-wika-merik-trang-xanh-5-600x600.jpg,Giày Pickleball Wika Merik trắng xanh,1.700.000₫,1.599.000₫,,
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-fury-trang-xam/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-trang-xam-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-trang-xam-2-600x600.jpg,Giày Pickleball Wika Fury màu trắng xám,1.300.000₫,1.199.000₫,,
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-fury-xanh-chuoi/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-xanh-chuoi-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-xanh-chuoi-5-600x600.jpg,Giày Pickleball Wika Fury màu xanh chuối,1.300.000₫,1.199.000₫,,
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-fury-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-xanh-ngoc-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-xanh-ngoc-4-600x600.jpg,Giày Pickleball Wika Fury màu xanh ngọc,1.300.000₫,1.199.000₫,,
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-fury-trang-xanh/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-trang-xanh-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-fury-quang-duong-trang-xanh-3-600x600.jpg,Giày Pickleball Wika Fury màu trắng xanh,1.300.000₫,1.199.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-astro-trang/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-trang-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-trang-2-600x600.jpg,Giày Pickleball Wika Astro trắng,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-astro-xanh-com/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-xanh-com-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-xanh-com-5-600x600.jpg,Giày Pickleball Wika Astro xanh cốm,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-astro-navy/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-navy-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-navy-6-600x600.jpg,Giày Pickleball Wika Astro navy,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-astro-xanh-duong/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-wika-astro-xanh-duong-600x600.jpg,,Giày Pickleball Wika Astro xanh dương,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-astro-trang-do/,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-trang-do-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/07/giay-pickleball-astro-trang-do-5-600x600.jpg,Giày Pickleball Wika Astro trắng đỏ,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-ruta-quang-duong-xanh-duong/,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-xanh-duong-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-xanh-duong-1-600x600.jpg,Giày Pickleball Wika Ruta Quang Dương xanh dương,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-ruta-quang-duong-trang-xanh/,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-trang-xanh-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-trang-xanh-1-600x600.jpg,Giày Pickleball Wika Ruta Quang Dương trắng xanh dương,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-ruta-quang-duong-trang/,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-trang-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-trang-1-600x600.jpg,Giày Pickleball Wika Ruta Quang Dương trắng,1.800.000₫,1.699.000₫,,
-6%,https://wikasports.com/san-pham/giay-pickleball-wika-ruta-quang-duong-do/,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-do-2-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-pickleball-wika-ruta-quang-duong-do-1-600x600.jpg,Giày Pickleball Wika Ruta Quang Dương đỏ,1.800.000₫,1.699.000₫,,
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-vetex-quang-duong-navy/,https://wikasports.com/wp-content/uploads/2025/05/giay-pickleball-wika-vetex-quang-duong-navy-1-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/05/giay-pickleball-wika-vetex-quang-duong-navy-2-600x600.jpg,Giày Pickleball Wika Vetex Quang Dương navy,1.200.000₫,1.099.000₫,Rated 5.00 out of 5,5.00
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-vetex-quang-duong-trang-xanh/,https://wikasports.com/wp-content/uploads/2025/05/unnamed-file-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/05/giay-pickleball-wika-vetex-quang-duong-trang-xanh-2-600x600.jpg,Giày Pickleball Wika Vetex Quang Dương trắng xanh,1.200.000₫,1.099.000₫,Rated 5.00 out of 5,5.00
-8%,https://wikasports.com/san-pham/giay-pickleball-wika-vetex-trang-xam/,https://wikasports.com/wp-content/uploads/2025/05/giay-pickleball-wika-vetex-quang-duong-trang-xam-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/05/giay-pickleball-wika-vetex-quang-duong-trang-xam-4-600x600.jpg,Giày Pickleball Wika Vetex Quang Dương trắng xám,1.200.000₫,1.099.000₫,Rated 5.00 out of 5,5.00
-6%,https://wikasports.com/san-pham/giay-wika-loudy-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-xanh-ngoc-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-xanh-ngoc-3-600x600.jpg,Giày Pickleball Wika Loudy xanh ngọc,699.000₫,659.000₫,Rated 5.00 out of 5,5.00
-6%,https://wikasports.com/san-pham/giay-wika-loudy-navy/,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-navy-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-navy-6-600x600.jpg,Giày Pickleball Wika Loudy navy,699.000₫,659.000₫,Rated 5.00 out of 5,5.00
-6%,https://wikasports.com/san-pham/giay-wika-loudy-trang/,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-trang-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/04/giay-the-thao-wika-loudy-trang-2-600x600.jpg,Giày Pickleball Wika Loudy trắng,699.000₫,659.000₫,Rated 5.00 out of 5,5.00
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-tyno-xanh-chuoi/,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-xanh-chuoi-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-xanh-chuoi-6-600x600.jpg,Giày Pickleball Wika Tyno xanh chuối,810.000₫,769.000₫,,
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-tyno-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-xanh-ngoc-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-xanh-ngoc-6-600x600.jpg,Giày Pickleball Wika Tyno xanh ngọc,810.000₫,769.000₫,Rated 5.00 out of 5,5.00
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-tyno-trang/,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-trang-1-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-trang-6-600x600.jpg,Giày Pickleball Wika Tyno trắng,810.000₫,769.000₫,,
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-tyno-navy/,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-navy-1-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/03/giay-pickleball-wika-tyno-navy-6-600x600.jpg,Giày Pickleball Wika Tyno navy,810.000₫,769.000₫,,
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-hyper-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2024/12/giay-pickleball-wika-hyper-xanh-ngoc-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2024/12/giay-pickleball-wika-hyper-xanh-ngoc-7-600x600.jpg,Giày Pickleball Wika Hyper xanh ngọc,810.000₫,769.000₫,,
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-hyper-navy/,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-navy-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-navy-3-600x600.jpg,Giày Pickleball Wika Hyper navy,810.000₫,769.000₫,Rated 5.00 out of 5,5.00
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-hyper-trang-xanh/,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-trang-xanh-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-trang-xanh-6-600x600.jpg,Giày Pickleball Wika Hyper trắng xanh,810.000₫,769.000₫,Rated 5.00 out of 5,5.00
-5%,https://wikasports.com/san-pham/giay-pickleball-wika-hyper-trang-do/,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-trang-do-1-600x600.jpg,https://wikasports.com/wp-content/uploads/2024/11/giay-pickleball-wika-hyper-trang-do-8-600x600.jpg,Giày Pickleball Wika Hyper trắng đỏ,810.000₫,769.000₫,Rated 5.00 out of 5,5.00
-8%,https://wikasports.com/san-pham/giay-wika-negar-trang-do/,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-trang-do-1_optimized-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-trang-do-4-600x600.jpg,Giày thể thao Wika Negar trắng đỏ,650.000₫,599.000₫,,
-8%,https://wikasports.com/san-pham/giay-wika-negar-trang-xanh/,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-trang-xanh-1_optimized-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-trang-xanh-2-600x600.jpg,Giày thể thao Wika Negar trắng xanh,650.000₫,599.000₫,,
-8%,https://wikasports.com/san-pham/giay-wika-negar-xanh-com/,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-xanh-com-1_optimized-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-xanh-com-3-600x600.jpg,Giày thể thao Wika Negar xanh cốm,650.000₫,599.000₫,,
-8%,https://wikasports.com/san-pham/giay-wika-negar-navy/,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-navy-1_optimized-600x600.jpg,https://wikasports.com/wp-content/uploads/2025/06/giay-wika-negar-navy-4-600x600.jpg,Giày thể thao Wika Negar navy,650.000₫,599.000₫,,
-10%,https://wikasports.com/san-pham/balo-wika-corepack-den-chuoi/,https://wikasports.com/wp-content/uploads/2025/07/balo-wika-corepack-den-chuoi-600x600.jpg,,Balo Wika Corepack màu đen chuối,2.100.000₫,1.900.000₫,,
-10%,https://wikasports.com/san-pham/balo-wika-corepack-den-xanh-ngoc/,https://wikasports.com/wp-content/uploads/2025/07/balo-wika-corepack-den-ngoc-600x600.jpg,,Balo Wika Corepack màu đen xanh ngọc,2.100.000₫,1.900.000₫,,
`;

const csvDataDonglucNam = `product-img href,lazyload src,pro-name href,pro-name,current-price
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88#xanh-39,https://cdn.hstatic.net/products/1000288768/2_f5b1077c9296408dbeb9349eead776af_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88,GIÀY THỂ THAO PICKLEBALL NAM PROMAX PI88,"865,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88#xanh-navy-39,https://cdn.hstatic.net/products/1000288768/3_ef408685658c45648547d9f52cfbaac5_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88,GIÀY THỂ THAO PICKLEBALL NAM PROMAX PI88,"865,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88#trang-39,https://cdn.hstatic.net/products/1000288768/5_10ad1e71d5a34877b26268c963bc683e_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-the-thao-pickleball-nam-promax-pi88,GIÀY THỂ THAO PICKLEBALL NAM PROMAX PI88,"865,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger#blue-39,https://product.hstatic.net/1000288768/product/z6701841824207_58bb32c9560c5301cde70454f564993f_1aecb19b7c1c466dbab7e9f6e6ad8440_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger,GIÀY PICKLEBALL NAM JOGARBOLA RANGER,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger#white-lime-39,https://product.hstatic.net/1000288768/product/z6701841824179_eb150560cd51f939e59a6f3e267c0b29_1596c8c560fc4be0be74369e70262d7b_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger,GIÀY PICKLEBALL NAM JOGARBOLA RANGER,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger#navy-39,https://product.hstatic.net/1000288768/product/z6701841897730_ddda57a23feae2bfd41d476ca313fd39_f2d9eead36db44f69bc10db944dc2534_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger,GIÀY PICKLEBALL NAM JOGARBOLA RANGER,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger#white-royal-39,https://product.hstatic.net/1000288768/product/z6701841849415_af3eae8c556f4f4dafb59d98fc25f470_3708b35baee1402685a5e198a44e6f69_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-jogarbola-ranger,GIÀY PICKLEBALL NAM JOGARBOLA RANGER,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86#stone-blue-39,https://product.hstatic.net/1000288768/product/z6703500264213_3e789c3914b93108e60b21fc300691d6_c966d2686d2c43559d71b2ff6f5068f7_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86,GIÀY PICKLEBALL NAM PROMAX PI86,"788,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86#navy-39,https://product.hstatic.net/1000288768/product/z6703500290675_3d3ff46d3933020a0cc093a88fa63a6c_12c6862c2c5643fc978d7dc9892d24d2_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86,GIÀY PICKLEBALL NAM PROMAX PI86,"788,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86#white-navy-39,https://product.hstatic.net/1000288768/product/z6703500202484_82d8cece0118484e05dd3f5e84fd83bf_4b7f987ac3544488b18548f07cc7a43d_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-nam-promax-pi86,GIÀY PICKLEBALL NAM PROMAX PI86,"788,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura#beige-39,https://product.hstatic.net/1000288768/product/z6709896984905_e54171311eb477df509a54ae125308b2_63836b3c633d4e2e86f96cad60a75c61_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura,GIÀY PICKLEBALL NAM JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura#white-39,https://product.hstatic.net/1000288768/product/z6709896953649_f4a3f1df2d688385d32a33f3c3f89316_924a6a2a223f4dfe98bf1a6282f1e4af_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura,GIÀY PICKLEBALL NAM JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura#navy-39,https://product.hstatic.net/1000288768/product/z6709897013707_53e06929744ba99e986a5d9cc2fd47ef_6d53c5871d4f4ffa9b836cad817b38e8_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura,GIÀY PICKLEBALL NAM JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura#gray-39,https://cdn.hstatic.net/products/1000288768/z6784186344749_29107817cd715f21fd33db74ffe40105_2dc56883b4774191b7a91993f84dee7c_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-endura,GIÀY PICKLEBALL NAM JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822#black-red-39,https://product.hstatic.net/1000288768/product/9_9421e4d0b7524277ada5ff0bd704b961_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822,GIÀY PICKLEBALL JOGARBOLA JG-220822,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822#blue-lime-39,https://product.hstatic.net/1000288768/product/7_4b1b835c9cb04b76a866b90d2a791d96_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822,GIÀY PICKLEBALL JOGARBOLA JG-220822,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822#skyeblue-navy-39,https://product.hstatic.net/1000288768/product/1_788251b9d67148bd8005871475742d04_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822,GIÀY PICKLEBALL JOGARBOLA JG-220822,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822#army-green-black-39,https://product.hstatic.net/1000288768/product/1_7ee92ccfcc704ed09006998039c825ae_master.png,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-220822,GIÀY PICKLEBALL JOGARBOLA JG-220822,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064#trang-39,https://product.hstatic.net/1000288768/product/11_210b33f2a8804f05ad09f472a49f1d5f_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064,GIÀY PICKLEBALL JOGARBOLA JG-222064,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064#den-39,https://product.hstatic.net/1000288768/product/5_c7bf4c7eabc44fb7972fbd50900c8957_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064,GIÀY PICKLEBALL JOGARBOLA JG-222064,"825,000₫"
https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064#xanh-navy-39,https://product.hstatic.net/1000288768/product/3_59ee658071c144a6833e1f29faf77dd5_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nam/products/giay-pickleball-jogarbola-jg-222064,GIÀY PICKLEBALL JOGARBOLA JG-222064,"825,000₫"
`;

const csvDataDonglucNu = `product-img href,lazyload src,pro-name href,pro-name,current-price
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j#giay-pickleball-nu-jogarbola-bubble-j-trang-36,https://product.hstatic.net/1000288768/product/4_839f8304f103469d8718fb1bdf65acf4_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j,GIÀY PICKLEBALL NỮ JOGARBOLA BUBBLE J,"995,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j#giay-pickleball-nu-jogarbola-bubble-j-xanh-navy-36,https://product.hstatic.net/1000288768/product/ch_n_logo_air_web_a026375689d74852b8fb0f8da2f555e6_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j,GIÀY PICKLEBALL NỮ JOGARBOLA BUBBLE J,"995,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j#giay-pickleball-nu-jogarbola-bubble-j-hong-36,https://product.hstatic.net/1000288768/product/3_b9cc22dd6ff3433f9b88059baa7bd3bd_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j,GIÀY PICKLEBALL NỮ JOGARBOLA BUBBLE J,"995,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j#giay-pickleball-nu-jogarbola-bubble-j-tim-36,https://product.hstatic.net/1000288768/product/2_02fdd33a02e340e9affe86936bfa8110_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-bubble-j,GIÀY PICKLEBALL NỮ JOGARBOLA BUBBLE J,"995,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-endura#white-lt-blue-39,https://product.hstatic.net/1000288768/product/z6710026843080_c3066dd5881820437d4555920cb012df_cab99fc45b324f4f95fa6982f624f2a7_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-endura,GIÀY PICKLEBALL NỮ JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-endura#white-lt-grey-36,https://product.hstatic.net/1000288768/product/z6710026772656_e834e78181457c4082aea73d9db883a5_c00edd0960694861b5c5c9c740f6f772_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-jogarbola-endura,GIÀY PICKLEBALL NỮ JOGARBOLA ENDURA,"1,050,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-promax-pi86#pink-38,https://product.hstatic.net/1000288768/product/pink_b835ed82b9604426a19128a3d523479a_master.png,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-promax-pi86,GIÀY PICKLEBALL PROMAX PI86,"788,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-promax-pi86#white-pink-38,https://product.hstatic.net/1000288768/product/white_pink_b59cc94a16eb4cec9dc5f4c607d28d81_master.png,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-pickleball-nu-promax-pi86,GIÀY PICKLEBALL PROMAX PI86,"788,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-the-thao-pickleball-nu-promax-pi88-1#hong-36,https://cdn.hstatic.net/products/1000288768/4_e50743315e764f2eaf6cf6cfbf34c982_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-the-thao-pickleball-nu-promax-pi88-1,GIÀY THỂ THAO PICKLEBALL NỮ PROMAX PI88,"865,000₫"
https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-the-thao-pickleball-nu-promax-pi88-1#trang-hong-36,https://cdn.hstatic.net/products/1000288768/1_f7124858af894432aad43bcef2205af8_master.jpg,https://donglucsport.vn/collections/giay-pickleball-nu/products/giay-the-thao-pickleball-nu-promax-pi88-1,GIÀY THỂ THAO PICKLEBALL NỮ PROMAX PI88,"865,000₫"
`;

const csvDataDonglucBongRo = `product-sale,product-img href,lazyload src,pro-name href,pro-name,current-price,compare-price
-20%,https://donglucsport.vn/collections/giay-bong-ro-nam/products/giay-bong-ro-comet-star#blue-46,https://product.hstatic.net/1000288768/product/beige_ac485be1094346d68a30ef8f3384c41b_master.png,https://donglucsport.vn/collections/giay-bong-ro-nam/products/giay-bong-ro-comet-star,GIÀY BÓNG RỔ COMET STAR,"1,400,000₫","1,750,000₫"
-20%,https://donglucsport.vn/collections/giay-bong-ro-nam/products/giay-bong-ro-comet-star#red-46,https://product.hstatic.net/1000288768/product/beige__3__70b92740c342463db40e1f4da2c086e9_master.png,https://donglucsport.vn/collections/giay-bong-ro-nam/products/giay-bong-ro-comet-star,GIÀY BÓNG RỔ COMET STAR,"1,400,000₫","1,750,000₫"
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23234#xanh-duong-40,https://product.hstatic.net/1000288768/product/16_67e7eae9ff7f414e9a71e539e6306a75_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23234,GIÀY BÓNG RỔ JOGARBOLA JG-23234,"900,000₫",
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23234#trang-40,https://product.hstatic.net/1000288768/product/10_c748ced90eb04a5d83402a4fe0a241bb_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23234,GIÀY BÓNG RỔ JOGARBOLA JG-23234,"900,000₫",
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23232#xanh-40,https://product.hstatic.net/1000288768/product/18_dd601e4516024600b7db50b7c9a6221d_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23232,GIÀY BÓNG RỔ JOGARBOLA JG-23232,"830,000₫",
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23232#ghi-40,https://product.hstatic.net/1000288768/product/14_9cfa5d7975e54a5abc5d91eb81e5578c_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23232,GIÀY BÓNG RỔ JOGARBOLA JG-23232,"830,000₫",
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23211#den-40,https://product.hstatic.net/1000288768/product/20_c22d259d91054091b2b3dfdd68a1d1d3_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23211,GIÀY BÓNG RỔ JOGARBOLA JG-23211,"870,000₫",
,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23211#xanh-navy-40,https://product.hstatic.net/1000288768/product/12_67f6c2421cd644e6bb9ddf0d64bade52_master.jpg,https://donglucsport.vn/collections/giay-bong-ro-nam/products/gia-y-bo-ng-ro-jogarbola-jg-23211,GIÀY BÓNG RỔ JOGARBOLA JG-23211,"870,000₫",
`;

const csvDataLotto = `img href,custom-thumb src,secondary-image src,category-name,woocommerce-loop-product__title,woocommerce-Price-amount
http://lottosports.vn/san-pham/lotto-eduardo-lotte0601i/,http://lottosports.vn/wp-content/uploads/2025/06/5-4.webp,http://lottosports.vn/wp-content/uploads/2025/06/4-3.webp,Eduardo,LOTTO EDUARDO LOTTE0601I,1.390.000 VNĐ
http://lottosports.vn/san-pham/lotto-eduardo-lotte0601o/,http://lottosports.vn/wp-content/uploads/2025/06/8-5.webp,http://lottosports.vn/wp-content/uploads/2025/06/7-5.webp,Eduardo,LOTTO EDUARDO LOTTE0601O,1.390.000 VNĐ
http://lottosports.vn/san-pham/lotto-eduardo-lotte0601w/,http://lottosports.vn/wp-content/uploads/2025/06/3-3.webp,http://lottosports.vn/wp-content/uploads/2025/06/5-3.webp,Eduardo,LOTTO EDUARDO LOTTE0601W,1.390.000 VNĐ
http://lottosports.vn/san-pham/lotto-enrico-lotte0501w/,http://lottosports.vn/wp-content/uploads/2025/06/1.webp,http://lottosports.vn/wp-content/uploads/2025/06/6.webp,Enrico,LOTTO ENRICO LOTTE0501W,1.259.000 VNĐ
http://lottosports.vn/san-pham/lotto-faye-lotte0901u/,http://lottosports.vn/wp-content/uploads/2025/07/lotto-faye-lotte250901u-9.webp,http://lottosports.vn/wp-content/uploads/2025/07/lotto-faye-lotte250901u-3.webp,Faye,LOTTO FAYE LOTTE0901U,1.430.000 VNĐ
http://lottosports.vn/san-pham/lotto-faye-lotte0901w/,http://lottosports.vn/wp-content/uploads/2025/07/lotto-faye-lotte250901w-11.webp,http://lottosports.vn/wp-content/uploads/2025/07/lotto-faye-lotte250901w-2.webp,Faye,LOTTO FAYE LOTTE0901W,1.430.000 VNĐ
http://lottosports.vn/san-pham/lotto-enrico-lotte0401g/,http://lottosports.vn/wp-content/uploads/2025/06/8-2.webp,http://lottosports.vn/wp-content/uploads/2025/06/7-2.webp,Enrico,LOTTO ENRICO LOTTE0401G,1.390.000 VNĐ
http://lottosports.vn/san-pham/lotto-etre-lotte0201e/,http://lottosports.vn/wp-content/uploads/2025/06/5-1.webp,http://lottosports.vn/wp-content/uploads/2025/06/8-1.webp,Etre,LOTTO ETRE LOTTE0201E,1.390.000 VNĐ
http://lottosports.vn/san-pham/lotto-mirage-400-alr-w-boc-lotte0302u/,http://lottosports.vn/wp-content/uploads/2025/06/lotto-mirage-400-alr-w-boc-lotte0302u-1.webp,http://lottosports.vn/wp-content/uploads/2025/06/lotto-mirage-400-alr-w-boc-lotte0302u-2.webp,Mirage,LOTTO MIRAGE 400 ALR W BOC LOTTE0302U,1.899.000 VNĐ
`;


interface ColumnMapping {
  image: number;
  url: number;
  name: number;
  price: number;
}

// A simple CSV parser that handles quoted fields which may contain commas.
const parseCSV = (data: string, mapping: ColumnMapping): Omit<Product, 'brand'>[] => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  if (headers.length === 0) return [];

  const products: Omit<Product, 'brand'>[] = [];
  
  // This regex handles comma-separated values, including quoted fields that contain commas.
  const csvRegex = /(?:,|^)(?:"([^"]*)"|([^,]*))/g;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const values: string[] = [];
    let match;
    csvRegex.lastIndex = 0; // Reset regex state
    while ((match = csvRegex.exec(line))) {
        values.push(match[1] || match[2]);
    }

    if (values.length > Math.max(mapping.image, mapping.url, mapping.name, mapping.price)) {
      const product: Omit<Product, 'brand'> = {
        image: values[mapping.image],
        url: values[mapping.url],
        name: values[mapping.name],
        price: values[mapping.price],
      };
      if (product.image && product.url && product.name && product.price) {
        products.push(product);
      }
    }
  }
  return products;
};

const extractBrand = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('kaiwin')) return 'Kaiwin';
  if (lowerName.includes('promax')) return 'Promax';
  if (lowerName.includes('wika')) return 'Wika';
  if (lowerName.includes('jogarbola')) return 'Jogarbola';
  if (lowerName.includes('lotto')) return 'Lotto';
  return 'Other'; // Fallback for any other brands
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  useEffect(() => {
    // Mapping for Kaiwin
    const mappingKaiwin: ColumnMapping = {
      image: 0,   // img src
      url: 3,     // product_name href
      name: 4,    // product_name
      price: 5,   // current_price
    };
    
    // Mapping for Wikasports
    const mappingWikasports: ColumnMapping = {
        image: 2,   // attachment-woocommerce_thumbnail src
        url: 1,     // image-zoom_in href
        name: 4,    // woocommerce-LoopProduct-link
        price: 6,   // woocommerce-Price-amount (2)
    };
    
    // Mapping for Dong Luc (general)
    const mappingDongluc: ColumnMapping = {
      image: 1,   // lazyload src
      url: 0,     // product-img href
      name: 3,    // pro-name
      price: 4,   // current-price
    };

    // Mapping for Dong Luc Bong Ro
    const mappingDonglucBongRo: ColumnMapping = {
        image: 2,   // lazyload src
        url: 1,     // product-img href
        name: 4,    // pro-name
        price: 5,   // current-price
    };

    // Mapping for Lotto Sports
    const mappingLotto: ColumnMapping = {
        image: 1,   // custom-thumb src
        url: 0,     // img href
        name: 4,    // woocommerce-loop-product__title
        price: 5,   // woocommerce-Price-amount
    };

    const parsedKaiwin = parseCSV(csvDataKaiwin, mappingKaiwin);
    const parsedWikasports = parseCSV(csvDataWikasports, mappingWikasports);
    const parsedDonglucNam = parseCSV(csvDataDonglucNam, mappingDongluc);
    const parsedDonglucNu = parseCSV(csvDataDonglucNu, mappingDongluc);
    const parsedDonglucBongRo = parseCSV(csvDataDonglucBongRo, mappingDonglucBongRo);
    const parsedLotto = parseCSV(csvDataLotto, mappingLotto);

    const allProducts = [
        ...parsedKaiwin,
        ...parsedWikasports,
        ...parsedDonglucNam,
        ...parsedDonglucNu,
        ...parsedDonglucBongRo,
        ...parsedLotto
    ].map(p => ({
      ...p,
      brand: extractBrand(p.name),
    }));

    setProducts(allProducts);
    setLoading(false);
  }, []);

  const brands = useMemo(() => {
    if (products.length === 0) return [];
    const uniqueBrands = [...new Set(products.map(p => p.brand))].sort();
    return ['All', ...uniqueBrands];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'All') {
      return products;
    }
    return products.filter(p => p.brand === selectedBrand);
  }, [selectedBrand, products]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-500">
            <i className="fas fa-spinner fa-spin text-4xl"></i>
            <p className="mt-4">Đang tải dữ liệu sản phẩm...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Lọc theo thương hiệu</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-5 py-2 rounded-full font-bold text-sm shadow-md transform transition-all duration-200 ${
                      selectedBrand === brand
                        ? 'bg-indigo-600 text-white scale-105'
                        : 'bg-white text-gray-800 hover:bg-gray-200 hover:shadow-lg'
                    }`}
                    aria-pressed={selectedBrand === brand}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={`${product.url}-${index}`} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
