import classes from './TypeIcon.module.css';

const TypeIcon = (props) => {
  const emojiMap = {
    glass: '🍸',
    cocktail: '🍹',
  };
  const classList = `${classes.typeIcon} ${classes[props.type]} ${
    classes[props.type]
  }`;
  return (
    <div className={classList}>
      {props.name} {emojiMap[props.type]}
    </div>
  );
};

export default TypeIcon;
