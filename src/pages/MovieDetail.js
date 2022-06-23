
import React from 'react';

import { useParams } from 'react-router-dom';

const Article = () => {
  const {name} = useParams()
  return (
  <>
  <h2>This is the {name} Article</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illum consequuntur inventore nesciunt non, nostrum aut excepturi unde, saepe suscipit ut, maiores consectetur asperiores! Numquam ipsam optio veritatis cum nisi.</p>
  </>
)}

export default Article