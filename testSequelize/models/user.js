const Sequelize = require('sequelize'); // Sequelize 모듈을 가져옴

class User extends Sequelize.Model { 
    static initate(sequelize) { // 모델 초기화 메서드
        User.init({
            name: {
                type: Sequelize.STRING(20), // 이름 필드, 문자열 타입, 최대 길이 20
                allowNull: false, // 필수 필드
                unique: true, // 고유 값
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, // 나이 필드, 부호 없는 정수 타입
                allowNull: false, // 필수 필드
            },
            married: {
                type: Sequelize.BOOLEAN, // 결혼 여부 필드, 불리언 타입
                allowNull: false, // 필수 필드
            },
            comment: {
                type: Sequelize.TEXT, // 코멘트 필드, 텍스트 타입
                allowNull: true, // 선택 필드
            },
            created_at: {
                type: Sequelize.DATE, // 생성일 필드, 날짜 타입
                allowNull: false, // 필수 필드
                defaultValue: Sequelize.NOW, // 기본값은 현재 시간
            },
        }, {
            sequelize, // Sequelize 인스턴스
            timestamps: false, // 타임스탬프 사용 안 함
            underscored: false, // 스네이크 케이스 사용 안 함
            modelName: 'User', // 모델 이름
            tableName: 'users', // 테이블 이름
            paranoid: false, // 삭제된 레코드 보존 안 함
            charset: 'utf8', // 문자셋 설정
            collate: 'utf8_general_ci', // 콜레이션 설정
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' }); // User 모델이 Comment 모델과 관계를 가짐
    }
}

module.exports = User; // User 클래스를 모듈로 내보냄