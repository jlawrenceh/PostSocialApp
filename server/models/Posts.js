module.exports = (sequelize, DataTypes ) => {


    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        postText: {
            type: DataTypes.STRING(280),
            allowNull: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Posts;
}