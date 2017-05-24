import React from 'react';
import styles from './scss/index.scss';
console.log(styles);
let Hello = () => {
    return (
        <div className={styles.hello}>
            <h2>Hello,</h2>
        </div>
    );
}
export {Hello};
