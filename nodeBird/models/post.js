const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            content:{
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img:{
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        },{
            sequelize, // 연결 객체
            timestamps: true, // createdAt, updatedAt 컬럼을 자동으로 생성
            underscored: false, // 카멜 케이스가 아닌 스네이크 케이스로 컬럼명을 바꿈
            modelName: 'Post', // 모델 이름 설정
            tableName: 'posts', // 테이블 이름 설정
            paranoid: false, // deletedAt 컬럼을 자동으로 생성
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Post.belongsTo(db.User); // 1:N
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // N:M
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // N:M
    }

}

module.exports = Post;