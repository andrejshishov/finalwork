import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import styles from '../NewArticle/NewArticle.module.scss'
import { addTag, deleteTag, editTag } from '../../store/slices/tags-slice'

const tagStyle = classNames(styles.input, styles.tag)
const deleteBtn = classNames(styles.btn, styles.delete)
const addBtn = classNames(styles.btn, styles.add)

function Tag({ id, idx, tagsLength, value }) {
  const lastOne = idx === tagsLength - 1

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteTag(id))
  }

  const onAdd = () => {
    dispatch(addTag())
  }
  const onLabelChange = (val) => {
    if (val !== undefined) {
      dispatch(
        editTag({
          id,
          label: val.trim(),
        })
      )
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Tag"
        defaultValue={value}
        className={tagStyle}
        onChange={(e) => onLabelChange(e.target.value)}
      />
      {tagsLength > 1 && (
        <button type="button" className={deleteBtn} onClick={onDelete}>
          Delete
        </button>
      )}
      {lastOne && (
        <button type="button" className={addBtn} onClick={onAdd}>
          Add Tag
        </button>
      )}
    </>
  )
}

export default Tag