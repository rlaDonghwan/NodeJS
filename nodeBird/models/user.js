const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            email:{
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick:{
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider:{
                type: Sequelize.ENUM('local','kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Post); // 1:N
        db.User.belongsToMany(db.User,{ // N:M
            foreignKey: 'followingId', // foreignKey는 컬럼명을 바꿔줌
            as: 'Followers', // as는 시퀄라이즈가 JOIN 작업 시 사용
            through: 'Follow', // as와 반대되는 모델을 가리킴
        });
        db.User.belongsToMany(db.User,{ // N:M
            foreignKey: 'followerId', // foreignKey는 컬럼명을 바꿔줌
            as: 'Followings', // as는 시퀄라이즈가 JOIN 작업 시 사용
            through: 'Follow', // as와 반대되는 모델을 가리킴
        });
        db.User.belongsToMany(db.Post,{through:'Like'});
    }
};

module.exports = User;